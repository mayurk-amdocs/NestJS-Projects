import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { CreateItemDto } from './dto/create-items.dto';
import {Item} from './interfaces/items.interface';
import {ItemsService} from './items.service';


@Controller('items')
export class ItemsController {
    constructor(private readonly itemsService: ItemsService){}

    @Get()
    findall(): Item[]{
        return this.itemsService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id): Item {
        return this.itemsService.findOne(id);
    }

    @Post()
    create(@Body() createItemDto: CreateItemDto){
        return `Name:${createItemDto.name} Description:${createItemDto.description} Quantity:${createItemDto.qty}`
    }

    @Delete(':id')
    delete(@Param('id') id): string {
        return `Delete ${id}`
    }

    @Put(':id')
    update(@Body() updateItemDto: CreateItemDto, @Param('id') id): string {
        return `Update ${id} - Name ${updateItemDto.name}`
    }
}
