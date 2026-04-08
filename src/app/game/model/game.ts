import { Author } from '@/app/author/model/author';
import { Category } from '@/app/category/model/category';

export interface Game {
    id: number;
    title: string;
    age: number;
    category: Category;
    author: Author;
}
