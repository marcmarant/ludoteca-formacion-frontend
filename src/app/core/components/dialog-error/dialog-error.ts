import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
    selector: 'app-dialog-error',
    standalone: true,
    imports: [MatButtonModule],
    templateUrl: './dialog-error.html',
    styleUrl: './dialog-error.scss',
})
export class DialogError {
    title = '';
    description = '';

    constructor(
        public dialogRef: MatDialogRef<DialogError>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {}

    ngOnInit(): void {
        this.title = this.data.title;
        this.description = this.data.description;
    }

    onClose() {
        this.dialogRef.close();
    }
}
