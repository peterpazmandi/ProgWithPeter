import { BaseContent } from "./base-content.model";
import { LectureActivity } from "./lectureActivityDto.model";
import { Post } from "./post.model";

export interface Lecture extends BaseContent {
    position: number;
    lectureActivities: LectureActivity[];
}