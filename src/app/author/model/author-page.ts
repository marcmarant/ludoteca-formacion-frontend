import { Pageable } from '@/app/core/model/page/pageable';
import { Author } from './author'

export interface AuthorPage {
    content: Author[];
    pageable: Pageable;
    totalElements: number;
}