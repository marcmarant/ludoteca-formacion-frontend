import { SortPage } from './sort-page';

export interface Pageable {
    pageNumber: number;
    pageSize: number;
    sort: SortPage[];
}
