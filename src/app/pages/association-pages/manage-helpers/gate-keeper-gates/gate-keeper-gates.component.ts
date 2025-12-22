import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AddGateKeeperComponent } from '../../../../modals/add-gate-keeper/add-gate-keeper.component';
import { ModalService } from 'ngx-modal-ease';
import { AddGateComponent } from '../../../../modals/add-gate/add-gate.component';
import { AssignGate2GatekeeperComponent } from '../../../../modals/assign-gate-2-gatekeeper/assign-gate-2-gatekeeper.component';

@Component({
  selector: 'app-gate-keeper-gates',
  imports: [CommonModule],
  templateUrl: './gate-keeper-gates.component.html',
  styleUrl: './gate-keeper-gates.component.css'
})
export class GateKeeperGatesComponent {
 activeTab: string = 'keeper';
 tableLoading = false

 constructor(private ModalService: ModalService) {}

  gateKeepers = [
    { name: 'John Doe', phone: '9876543210', email: 'john@example.com', assigned_gate : '1' },
    { name: 'Mary Paul', phone: '9123456780', email: 'mary@example.com', assigned_gate : '2' },
    { name: 'Samuel Roy', phone: '9000123456', email: 'sam@example.com', assigned_gate : '4' }
  ];

  gates = [
    { gateNo: 'Gate 1', keeper: 'John Doe', phone: '9876543210' },
    { gateNo: 'Gate 2', keeper: 'Mary Paul', phone: '9123456780' },
    { gateNo: 'Gate 3', keeper: 'Samuel Roy', phone: '9000123456' }
  ];

  switchTab(tab: string) {
    this.activeTab = tab;
  }


    OpenAddGateKeeper() {
      this.ModalService.open(AddGateKeeperComponent, {
        modal: {
          enter: 'enter-going-down 0.3s ease-out',
          leave: 'fade-out 0.5s',
        },
        overlay: { leave: 'fade-out 0.5s' },
        actions: {
          click: false,
          escape: false,
        },
      });
    }
    OpenAddGate() {
      this.ModalService.open(AddGateComponent, {
        modal: {
          enter: 'enter-going-down 0.3s ease-out',
          leave: 'fade-out 0.5s',
        },
        overlay: { leave: 'fade-out 0.5s' },
        actions: {
          click: false,
          escape: false,
        },
      });
    }
    AssignGates() {
      this.ModalService.open(AssignGate2GatekeeperComponent, {
        modal: {
          enter: 'enter-going-down 0.3s ease-out',
          leave: 'fade-out 0.5s',
        },
        overlay: { leave: 'fade-out 0.5s' },
        actions: {
          click: false,
          escape: false,
        },
      });
    }
}
