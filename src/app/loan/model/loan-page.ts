import { Pageable } from '@/app/core/model/page/pageable';
import { Loan } from './loan';

export interface LoanPage {
    content: Loan[];
    pageable: Pageable;
    totalElements: number;
}
