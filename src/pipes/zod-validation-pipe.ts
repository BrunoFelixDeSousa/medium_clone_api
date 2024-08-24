import { BadRequestException, HttpStatus, PipeTransform } from '@nestjs/common';
import { Schema, ZodError } from 'zod';

export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: Schema) {}

  transform(value: unknown) {
    try {
      return this.schema.parse(value);
    } catch (error) {
      if (error instanceof ZodError) {
        throw new BadRequestException({
          message: 'Validation failed',
          statusCode: HttpStatus.BAD_REQUEST,
          error: error.message,
        });
      }
    }
  }
}
