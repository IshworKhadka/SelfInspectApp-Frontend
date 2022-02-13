import { Component, OnInit } from '@angular/core';
import { Apiservice } from 'src/app/api.service';
import { FeedbackModel } from 'src/app/models/feedback';

@Component({
  selector: 'app-inspection-feedback',
  templateUrl: './inspection-feedback.component.html',
  styleUrls: ['./inspection-feedback.component.css']
})
export class InspectionFeedbackComponent implements OnInit {

  constructor(private api: Apiservice) { }

  feedback: FeedbackModel
  inspectionId: any
  user: any
  

  ngOnInit(): void {
    this.inspectionId = localStorage.getItem('inspection')
    this.user = localStorage.getItem('user')
  }


  //Feedback
  postFeedback(feedbacks: FeedbackModel){
    feedbacks.InspectionId = this.inspectionId
    feedbacks.FeedbackGivenBy = this.user
    feedbacks.SectionId = parseInt(localStorage.getItem('section') as string)
    debugger
    this.api.postFeedback(feedbacks).subscribe((res: any) => {
      console.log(this.inspectionId)
      console.log(this.user)

    })

  }

}
