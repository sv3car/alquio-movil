import { Injectable, Output, EventEmitter } from '@angular/core'

@Injectable()
export class OrdertService {

    @Output() change: EventEmitter<boolean> = new EventEmitter();

    toggle(serviDisplay: boolean) {
        this.change.emit(serviDisplay);
    }
}