import React from 'react';
import './css/main.css';

function App() {
  return (
    <div className="App">
      <div class="container">
        <h1 class="mt-4">Hi~</h1>
        <h2 class="mb-5">I'm Leo Sirius, a software engineer and philosopher</h2>
        <div>
          <h2>Projects</h2>
          <div class="work-main-content">
            <a href="https://851958789.gitbook.io/leo-notes/" class="work-title">学习笔记</a>
            <p></p>
            <a href="https://github.com/LeoSirius/leetcode_solutions" class="work-title">leetcode刷题笔记</a>
            <p>几乎每题都有解题思路和单元测试，不断补充中</p>
          </div>
        </div>
        <p class="mt-5 font-weight-bold">You can contact me through following ways</p>
        <ul>
          <li><span class="font-weight-bold">Emails: </span>is.li.xiaoyu@qq.com, leosirius666@gmail.com (choose one, both works)</li>
          <li><span class="font-weight-bold">Github: </span><a target="_blank" href="https://github.com/LeoSirius">https://github.com/LeoSirius</a></li>
        </ul>
      </div>
    </div>
  );
}

export default App;
