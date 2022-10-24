import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-emergency-dialog',
  templateUrl: './emergency-dialog.component.html',
  styleUrls: ['./emergency-dialog.component.scss']
})
export class EmergencyDialogComponent implements OnInit {

  @Input() cityName: string = '' ;
  @Input() temperature: number = 0;
  @Input() humidity: number = 0;
  
  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<EmergencyDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
