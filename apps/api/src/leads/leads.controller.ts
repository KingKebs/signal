import { Controller, Get, Post, Patch, Body, Param, Headers, NotFoundException, UseGuards, Request } from '@nestjs/common';
import { LeadsService } from './leads.service.js';
import { CreateLeadDto } from './dto/create-lead.dto.js';
import { UpdateLeadDto } from './dto/update-lead.dto.js';
import { CreateFollowUpDto } from './dto/create-follow-up.dto.js';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';

@Controller('leads')
export class LeadsController {
  constructor(private readonly leadsService: LeadsService) {}

  // Public endpoint for capturing leads (e.g., from marketing website)
  @Post('capture')
  create(@Body() createLeadDto: CreateLeadDto, @Headers() headers: Record<string, string>) {
    // For a real public endpoint, this would be an API key or an origin check.
    const tenantId = headers['x-tenant-id'] || 'mock-tenant-1';
    return this.leadsService.create(createLeadDto, tenantId);
  }

  @Get()
  findAll(@Headers() headers: Record<string, string>) {
    const tenantId = headers['x-tenant-id'] || 'mock-tenant-1';
    return this.leadsService.findAll(tenantId);
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Headers() headers: Record<string, string>) {
    const tenantId = headers['x-tenant-id'] || 'mock-tenant-1';
    const lead = await this.leadsService.findOne(id, tenantId);
    if (!lead) {
      throw new NotFoundException(`Lead with ID ${id} not found in this tenant`);
    }
    return lead;
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateLeadDto: UpdateLeadDto, @Headers() headers: Record<string, string>) {
    const tenantId = headers['x-tenant-id'] || 'mock-tenant-1';
    const lead = await this.leadsService.update(id, tenantId, updateLeadDto);
    if (!lead) {
      throw new NotFoundException(`Lead with ID ${id} not found in this tenant`);
    }
    return lead;
  }

  @Post(':id/follow-ups')
  async addFollowUp(@Param('id') id: string, @Body() createFollowUpDto: CreateFollowUpDto, @Headers() headers: Record<string, string>) {
    const tenantId = headers['x-tenant-id'] || 'mock-tenant-1';
    const followUp = await this.leadsService.addFollowUp(id, tenantId, createFollowUpDto);
    if (!followUp) {
      throw new NotFoundException(`Lead with ID ${id} not found in this tenant`);
    }
    return followUp;
  }
}
