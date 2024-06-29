import { Controller, Post, Param, Body, Get } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dtos/create-review';

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewService: ReviewsService) {}

  @Post()
  async createReview(@Body() createReviewDto: CreateReviewDto) {
    return this.reviewService.createReview(createReviewDto);
  }

  @Get('/product/:productId')
  async getReviewsByProduct(@Param('productId') productId: string) {
    return this.reviewService.getReviewsByProduct(productId);
  }
}
