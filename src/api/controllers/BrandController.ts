import {
  Authorized,
  Body,
  CurrentUser,
  Delete,
  Get,
  JsonController,
  Param,
  Post,
  Put,
  QueryParams,
} from 'routing-controllers';
import { OpenAPI, ResponseSchema } from 'routing-controllers-openapi';

import { EntityController } from './base/EntityController';
import { FindParams, IBrand, Id, IUser, Page } from '../../types';
import { BrandResponse } from './responses/BrandResponse';
import { BrandBody } from './requests/BrandBody';
import { BrandMapper } from '../transformers/BrandMapper';
import { BrandService } from '../services';

@Authorized()
@OpenAPI({ security: [{ bearerAuth: [] }] })
@JsonController('/brand')
export class BrandController extends EntityController<
  IBrand,
  BrandResponse,
  BrandBody
> {
  constructor(service: BrandService, mapper: BrandMapper) {
    super();
    this.mapper = mapper;
    this.service = service;
  }

  @Get('/:id([0-9]+)')
  @ResponseSchema(BrandResponse)
  public async findOne(
    @CurrentUser() user: IUser,
    @Param('id') id: Id
  ): Promise<BrandResponse | undefined> {
    return super.findOne(user, id);
  }

  @Get()
  @ResponseSchema(Page)
  public async find(
    @CurrentUser() user: IUser,
    @QueryParams() params?: FindParams<IBrand>
  ): Promise<Page<BrandResponse>> {
    return super.find(user, params);
  }

  @Post()
  @ResponseSchema(BrandResponse)
  public async create(
    @CurrentUser() user: IUser,
    @Body() body: BrandBody
  ): Promise<BrandResponse> {
    return super.create(user, body);
  }

  @Put('/:id([0-9]+)')
  @ResponseSchema(BrandResponse)
  public async update(
    @CurrentUser() user: IUser,
    @Param('id') id: Id,
    @Body() body: Partial<BrandBody>
  ): Promise<BrandResponse> {
    return super.update(user, id, body);
  }

  @Delete('/:id([0-9]+)')
  @ResponseSchema(BrandResponse)
  public async delete(
    @CurrentUser() user: IUser,
    @Param('id') id: Id
  ): Promise<BrandResponse> {
    return super.delete(user, id);
  }
}
