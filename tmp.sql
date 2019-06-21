INSERT INTO online_judge_ojtopic
(id, title, desc_general, desc_input, desc_output, exam_input, exam_output, code, created_time, modified_time, source, solution, author_id)
select id, title, desc_general, desc_input, desc_output, exam_input, exam_output, code, created_time, modified_time, source, solution, author_id
from algorithm_topic_algorithmtopic;


INSERT INTO online_judge_ojtopic select * from algorithm_topic_algorithmtopic;

insert into share_fileshareapprovalstatus values 
(1, 'b@pingan.com.cn', 0, '111', '2019-06-14 01:59:29.868000', '2019-06-18 01:59:29.847989', 37);

change-download-link-status
STATUS_PASS = 1
STATUS_VETO = 2