import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Review } from './review.entity';
import { User } from '../users/user.entity';
import { Product } from '../products/product.entity';
import { CreateReviewDto } from './dtos/create-review';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Review)
    private readonly reviewRepository: Repository<Review>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async createReview(createReviewDto: CreateReviewDto) {
    const user = await this.userRepository.findOneBy({
      userID: createReviewDto.userId,
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const product = await this.productRepository.findOneBy({
      id: createReviewDto.productId,
    });
    if (!product) {
      throw new NotFoundException('Product not found');
    }

    const review = this.reviewRepository.create({
      user,
      product,
      rating: createReviewDto.rating,
      comment: createReviewDto.comment,
    });

    return await this.reviewRepository.save(review);
  }

  async getReviewsByProduct(productId: string) {
    return await this.reviewRepository.find({
      where: { product: { id: productId } },
      relations: ['user'],
    });
  }
}
