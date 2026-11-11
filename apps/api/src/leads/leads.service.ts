import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateLeadDto } from './dto/create-lead.dto.js';
import { UpdateLeadDto } from './dto/update-lead.dto.js';
import { CreateFollowUpDto } from './dto/create-follow-up.dto.js';

@Injectable()
export class LeadsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createLeadDto: CreateLeadDto, tenantId: string) {
    let priorityScore = 50; 
    let scoreReason = "Base score 50";

    if (createLeadDto.company) {
      priorityScore += 10;
      scoreReason += ", +10 for providing company";
    }
    
    if (createLeadDto.source === 'Demo Request' || createLeadDto.source === 'Contact Form') {
      priorityScore += 30;
      scoreReason += ", +30 for explicit inbound request";
    }

    if (createLeadDto.email.endsWith('@gmail.com') || createLeadDto.email.endsWith('@yahoo.com')) {
      priorityScore -= 20;
      scoreReason += ", -20 for free email provider";
    }

    const status = priorityScore >= 70 ? 'Qualified' : 'New';

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

  async getDashboardStats(tenantId: string) {
    const totalLeads = await this.prisma.lead.count({ where: { tenantId } });
    const qualifiedLeads = await this.prisma.lead.count({ where: { tenantId, status: 'Qualified' } });
    const newLeads = await this.prisma.lead.count({ where: { tenantId, status: 'New' } });
    const contactedLeads = await this.prisma.lead.count({ where: { tenantId, status: 'Contacted' } });
    const convertedLeads = await this.prisma.lead.count({ where: { tenantId, status: 'Converted' } });
    
    const recentFollowUps = await this.prisma.followUp.findMany({
      where: { lead: { tenantId } },
      include: { lead: true },
      orderBy: { scheduledAt: 'desc' },
      take: 4,
    });
    
    const priorityQueue = await this.prisma.lead.findMany({
      where: { tenantId, status: { in: ['New', 'Qualified', 'Contacted'] } },
      orderBy: { priorityScore: 'desc' },
      take: 5,
    });
    
    return {
      kpis: {
         totalLeads,
         qualifiedLeads,
         awaitingFollowUp: newLeads,
         pipelineValue: (totalLeads * 12500) 
      },
      dealStages: [
        { stage: "New", count: newLeads, value: "$" + (newLeads * 12.5).toFixed(1) + "K", color: "bg-blue-500" },
        { stage: "Qualified", count: qualifiedLeads, value: "$" + (qualifiedLeads * 12.5).toFixed(1) + "K", color: "bg-indigo-500" },
        { stage: "Contacted", count: contactedLeads, value: "$" + (contactedLeads * 12.5).toFixed(1) + "K", color: "bg-accent" },
        { stage: "Converted", count: convertedLeads, value: "$" + (convertedLeads * 12.5).toFixed(1) + "K", color: "bg-emerald-500" },
      ],
      recentActivity: recentFollowUps.map((f: any) => ({
        action: `${f.actionType} logged`,
        lead: f.lead.name,
        time: f.scheduledAt,
        status: f.actionType === 'Meeting' ? 'alert' : 'completed'
      })),
      priorityQueue
    };
  }

  async findOne(id: string, tenantId: string) {
    return this.prisma.lead.findFirst({
      where: { id, tenantId },
      include: { followUps: { orderBy: { scheduledAt: 'desc' } } },
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
