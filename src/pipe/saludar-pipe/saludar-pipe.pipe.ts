import {
  ArgumentMetadata,
  HttpException,
  HttpStatus,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class SaludarPipePipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    console.log('value', value);
    console.log(['metadata', metadata]);

    const parseAge = parseInt(value?.age.toString(), 10);

    if (isNaN(parseAge)) {
      throw new HttpException('age must be a number', HttpStatus.BAD_REQUEST);
    }
    return { ...value, age: parseAge };
  }
}
