import React from "react";
import {
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  formatDistanceToNow,
  parseISO,
} from "date-fns";

const DateFeedItem = ({ dateString }: { dateString: string }) => {
  try {
    const date = parseISO(dateString);
    const now = new Date();

    const daysDifference = differenceInDays(now, date);
    const hoursDifference = differenceInHours(now, date);
    const minutesDifference = differenceInMinutes(now, date);

    let displayText = "";

    if (daysDifference > 0) {
      displayText = `${daysDifference}d`;
    } else if (hoursDifference > 0) {
      displayText = `${hoursDifference}h`;
    } else if (minutesDifference > 0) {
      displayText = `${minutesDifference}m`;
    } else {
      displayText = formatDistanceToNow(date, { addSuffix: true });
    }

    return <span>{displayText}</span>;
  } catch (error) {
    return <>Invalid</>;
  }
};

export default DateFeedItem;
