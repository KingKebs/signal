import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateLeadDto } from './dto/create-lead.dto';

@Injectable()
export class LeadsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createLeadDto: CreateLeadDto, tenantId: string) {
    // 1. Calculate rule-based priority score
    let priorityScore = 50; // Base score
    let scoreReason = "Base score 50";

    // Example simple scoring rules for Phase 4
    if (createLeadDto.company) {
      priorityScore += 10;
      scoreReason += ", +10 for providing company";
    }
    
    // Explicit demo requests score higher
    if (createLeadDto.source === 'Demo Request' || createLeadDto.source === 'Contact Form') {
      priorityScore += 30;
      scoreReason += ", +30 for explicit inbound request";
    }

    // Free emails score lower
    if (createLeadDto.email.endsWith('@gmail.com') || createLeadDto.email.endsWith('@yahoo.com')) {
      priorityScore -= 20;
      scoreReason += ", -20 for free email provider";
    }

    // 2. Determine initial status based on score
    const status = priorityScore >= 70 ? 'Qualified' : 'New';

    // 3. Persist to DB
    return this.prisma.lead.create({
      data: {
        tenantId,
        name: createLeadDto.name,
        email: createLeadDto.email,
        phone: createLeadDto.phone,
        company: createLeadDto.company,
        source: createLeadDto.source,
        status,
        priorityScore,
        scoreReason,
        consentMetadata: { granted: createLeadDto.consent_granted, timestamp: new Date().toISOString() },
      },
    });
  }

  async findAll(tenantId: string) {
    return this.prisma.lead.findMany({
      where: { tenantId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string, tenantId: string) {
    return this.prisma.lead.findFirst({
      where: { id, tenantId },
      include: { followUps: true },
    });
  }
}
