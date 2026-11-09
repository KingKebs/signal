import { IsEmail, IsNotEmpty, IsOptional, IsString, IsBoolean, Equals } from 'class-validator';

export class CreateLeadDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsOptional()
  phone?: string;

  @IsString()
  @IsOptional()
  company?: string;

  @IsString()
  @IsNotEmpty()
  source: string;

  // For MVP, we require explicit consent granted
  @IsBoolean()
  @Equals(true, { message: 'Consent must be explicitly granted' })
  consent_granted: boolean;
}
