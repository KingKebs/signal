import { Controller, Get, Post, Body, Param, Headers, NotFoundException } from '@nestjs/common';
import { LeadsService } from './leads.service';
import { CreateLeadDto } from './dto/create-lead.dto';

@Controller('leads')
export class LeadsController {
  constructor(private readonly leadsService: LeadsService) {}

  // In Phase 5, this will be handled automatically by JWT and interceptors.
  // For Phase 4 MVP, we'll accept a mock tenant ID header or use a fallback.
  private getTenantId(headers: Record<string, string>): string {
    return headers['x-tenant-id'] || 'mock-tenant-1';
  }

  @Post('capture')
  create(@Body() createLeadDto: CreateLeadDto, @Headers() headers: Record<string, string>) {
    const tenantId = this.getTenantId(headers);
    return this.leadsService.create(createLeadDto, tenantId);
  }

  @Get()
  findAll(@Headers() headers: Record<string, string>) {
    const tenantId = this.getTenantId(headers);
    return this.leadsService.findAll(tenantId);
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Headers() headers: Record<string, string>) {
    const tenantId = this.getTenantId(headers);
    const lead = await this.leadsService.findOne(id, tenantId);
    if (!lead) {
      throw new NotFoundException(`Lead with ID ${id} not found in this tenant`);
    }
    return lead;
  }
}
