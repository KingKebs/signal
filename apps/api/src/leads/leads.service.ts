import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateLeadDto } from './dto/create-lead.dto.js';
import { UpdateLeadDto } from './dto/update-lead.dto.js';
import { CreateFollowUpDto } from './dto/create-follow-up.dto.js';

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

  async update(id: string, tenantId: string, updateLeadDto: UpdateLeadDto) {
    const lead = await this.prisma.lead.findFirst({ where: { id, tenantId } });
    if (!lead) return null;

    return this.prisma.lead.update({
      where: { id },
      data: {
        ...(updateLeadDto.status && { status: updateLeadDto.status }),
      },
    });
  }

  async addFollowUp(leadId: string, tenantId: string, dto: CreateFollowUpDto) {
    const lead = await this.prisma.lead.findFirst({ where: { id: leadId, tenantId } });
    if (!lead) return null;
    
    // In Phase 5 auth we'd have the JWT userId. 
    // Here we just grab the first user in the tenant as a fallback mock for Phase 6.
    const user = await this.prisma.user.findFirst({ where: { tenantId } });
    if (!user) throw new Error("No user found in tenant");

    return this.prisma.followUp.create({
      data: {
        leadId,
        ownerId: user.id,
        actionType: dto.actionType,
        notes: dto.notes,
        scheduledAt: new Date(dto.scheduledAt),
        status: dto.status,
      },
    });
  }
}
