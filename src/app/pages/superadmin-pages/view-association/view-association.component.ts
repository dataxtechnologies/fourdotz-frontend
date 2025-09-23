import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-view-association',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './view-association.component.html',
  styleUrl: './view-association.component.css'
})
export class ViewAssociationComponent {

  activeTab: string = 'Properties';


  setTab(tab: string) {
  this.activeTab = tab;
}


  goback(){}

}
