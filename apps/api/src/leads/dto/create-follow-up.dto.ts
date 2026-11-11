import { IsString, IsOptional, IsIn, IsDateString } from 'class-validator';

export class CreateFollowUpDto {
  @IsString()
  @IsIn(['Call', 'Email', 'Meeting', 'Note'])
  actionType: string;

  @IsString()
  @IsOptional()
  notes?: string;

  @IsString()
  @IsIn(['Pending', 'Completed'])
  status: string;

  @IsDateString()
  scheduledAt: string;
}
