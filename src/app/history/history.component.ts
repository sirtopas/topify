import { Component, OnInit } from '@angular/core';
import { HistoryService } from '../service/history.service';

@Component({
    selector: 'app-history',
    templateUrl: './history.component.html',
    styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

    history: any;

    constructor(private historyService: HistoryService) { }

    ngOnInit(): void {
        this.historyService.getHistory().subscribe(history => {
            this.history = history;
            console.log(this.history);

        });
    }
}
