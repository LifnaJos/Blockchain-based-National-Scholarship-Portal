import React from "react";
import noticeBoardsData from "./NoticeBoardData";

function NoticeBoardHeader() {
  return (
    <div className="notification-bg bg-primary text-white notification text-center" style={{fontWeight: "500", padding: "5px", }}>
      Notice Board
    </div>
  );
}

function Entry({ announcement }) {
  return (
    <li style={{color: "red"}}>
      {announcement.link ? (
        <a style={{textDecoration: "none"}} href={announcement.link}>
          {announcement.linkText}
        </a>
      ) : (
        announcement.text
      )}
    </li>
  );
}

function NoticeBoard({ headingText, data }) {
    return (
      <div className="noticeBoard">
        <div className="card mb-2">
          <NoticeBoardHeader headingText={headingText} />
          <div className="card-body notification-body border border-primary">
            <marquee behavior="scroll" scrollamount="3" direction="up" loop="infinite" height="150px">
              <ul className="notificationlist list-unstyled text-justify">
                {data[0].text.map((paragraph, index) => (
                  <Entry key={index} announcement={{ text: paragraph }} />
                ))}
                {data[0].link && <Entry announcement={data[0]} />}
              </ul>
            </marquee>
          </div>
        </div>
      </div>
    );
  }

  function AnnouncementNotice() {
    return (
      <div className="noticeBoardsContainer">
        {noticeBoardsData.map(({ headingText, data }) => (
          <NoticeBoard key={headingText} headingText={headingText} data={data} />
        ))}
      </div>
    );
  }
  
export default AnnouncementNotice;