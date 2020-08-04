import { Component, OnInit, Input } from '@angular/core';
import { IShow } from 'src/app/models/show';


@Component({
  selector: 'app-show-item',
  templateUrl: './show-item.component.html',
  styleUrls: ['./show-item.component.scss']
})
export class ShowItemComponent implements OnInit {
  @Input() show: IShow;

  constructor() { }

  ngOnInit() {
  }

}
