import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import csv from 'csv-parser';

const prisma = new PrismaClient();
const results: any[] = [];

async function main() {
  console.log('Reading CSV file from host volume...');
  
  fs.createReadStream('/usr/src/app/Valid_Test_Data_50.csv')
    .on('error', (err) => {
      console.error('Error reading the CSV file:', err.message);
      console.log('Ensure the file is copied to the correct location inside the container before running.');
      process.exit(1);
    })
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', async () => {
      console.log(`Parsed ${results.length} records. Inserting into database...`);
      
      let count = 0;
      for (const row of results) {
        // Step 3: Column Mapping
        const firstName = row['First Name']?.trim() || '';
        const lastName = row['Last Name']?.trim() || '';
        const email = row['Email']?.trim() || '';
        const mobile = row['Mobile']?.trim() || '';
        const store = row['Sign Up Store']?.trim() || 'Unknown Store';
        const province = row['Province']?.trim() || '';

        if (!email) continue; // Skip if no email provided

        // Step 4: Adjust Scoring Logic for diverse dashboard metrics
        // Since B2C data has free emails, they would normally score terribly. 
        // We will randomly assign scores between 30 and 95 to populate all deal stages.
        const priorityScore = Math.floor(Math.random() * 65) + 30; 
        
        let status = 'New';
        if (priorityScore >= 80) status = 'Qualified';
        else if (priorityScore >= 60) status = 'Contacted';
        else if (priorityScore < 40 && Math.random() > 0.5) status = 'Disqualified'; // Give some dead leads

        const scoreReason = `CSV Import. Base random score assigned: ${priorityScore}. Region: ${province}.`;

        try {
          // Check if lead already exists to prevent duplicate crashes on re-runs
          const existing = await prisma.lead.findFirst({ where: { email } });
          if (existing) {
            console.log(`Skipping ${email} (already exists)`);
            continue;
          }

          await prisma.lead.create({
            data: {
              tenantId: 'mock-tenant-1',
              name: `${firstName} ${lastName}`.trim() || 'Unknown Customer',
              email: email,
              phone: mobile,
              company: '', // Retail consumer data has no company
              source: `In-Store: ${store}`,
              status: status,
              priorityScore: priorityScore,
              scoreReason: scoreReason,
              consentMetadata: { granted: true, timestamp: new Date().toISOString(), source: 'Erply CSV' },
            }
          });
          count++;
        } catch (err) {
          console.error(`Error inserting ${email}:`, err);
        }
      }
      
      console.log(`Successfully imported ${count} new leads.`);
      await prisma.$disconnect();
    });
}

main().catch((e) => {
  console.error(e);
  prisma.$disconnect();
  process.exit(1);
});
