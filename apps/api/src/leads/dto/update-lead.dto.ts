import { IsString, IsOptional, IsIn } from 'class-validator';

export class UpdateLeadDto {
  @IsString()
  @IsOptional()
  @IsIn(['New', 'Qualified', 'Contacted', 'Converted', 'Disqualified', 'Archived'])
  status?: string;
}
