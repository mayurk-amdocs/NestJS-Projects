import { Injectable } from '@nestjs/common';
import {Item} from './interfaces/items.interface';

@Injectable()
export class ItemsService {
    private readonly items: Item[] = [
        {
            id: "67645342",
            name: "Item One",
            description: "This Item no. 1",
            qty: 2
        },
        {
            id: "67645343",
            name: "Item Two",
            description: "This Item no. 2",
            qty: 3
        }
    ];

    findAll(): Item[] {
        return this.items;
    }

    findOne(id: string): Item{
        return this.items.find(item => item.id === id);
    }
}
