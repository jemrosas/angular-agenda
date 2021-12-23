import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';


@Component({
  selector: 'app-dialog-result',
  templateUrl: './dialog-result.component.html',
  styleUrls: ['./dialog-result.component.css']
})
export class DialogResultComponent implements OnInit {

  constructor(
    public dialog   : MatDialog,
    public dialogRef: MatDialogRef<DialogResultComponent>,
    // Inyectamos los datos recibidos como respuesta de la llamada http para avisar al usuario
    @Inject(MAT_DIALOG_DATA) public data: {status: string}) { }

  ngOnInit(): void {
  }

}
