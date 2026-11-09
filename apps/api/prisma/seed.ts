import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // 1. Create a dummy tenant
  const tenant = await prisma.tenant.create({
    data: {
      id: 'mock-tenant-1',
      name: 'Wayne Enterprises HQ',
    },
  });
  console.log(`Tenant created: ${tenant.id}`);

  // 2. Create a dummy user
  const passwordHash = await bcrypt.hash('password123', 10);
  const user = await prisma.user.create({
    data: {
      tenantId: tenant.id,
      email: 'admin@wayne.com',
      role: 'Admin',
      passwordHash,
    },
  });
  console.log(`User created: ${user.email}`);

  // 3. Create dummy leads
  const leads = await Promise.all([
    prisma.lead.create({
      data: {
        tenantId: tenant.id,
        name: 'Clark Kent',
        email: 'clark@dailyplanet.com',
        company: 'Daily Planet',
        source: 'Contact Form',
        status: 'New',
        priorityScore: 90,
        scoreReason: 'Base score 50, +10 for providing company, +30 for explicit inbound request',
        consentMetadata: { granted: true, timestamp: new Date().toISOString() },
      },
    }),
    prisma.lead.create({
      data: {
        tenantId: tenant.id,
        name: 'Peter Parker',
        email: 'peter@gmail.com', // free email
        source: 'Webinar Registration',
        status: 'New',
        priorityScore: 30,
        scoreReason: 'Base score 50, -20 for free email provider',
        consentMetadata: { granted: true, timestamp: new Date().toISOString() },
      },
    }),
  ]);
  
  console.log(`Created ${leads.length} leads.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
