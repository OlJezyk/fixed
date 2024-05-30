import "../../styles/Dashboard.css";
import TaskWidget from "./Widgets/Tasks/TaskWidget";
import React, { useState, useRef } from "react";

export default function Dashboard() {

  

  const [resizingElement, setResizingElement] = useState<HTMLElement | null>(
    null
  );

  const WidgetContainerRef = useRef<HTMLDivElement>(null);

  function pointerDown(e: React.MouseEvent) {
    const element = e.target as HTMLElement;
    if (resizingElement !== null) return;
    if (element.className !== "resize_icon") {
      return;
    }
    //clicked on resizing icon
    const widget = element.parentElement;
    setResizingElement(widget);
  }

  function pointerMove(e: React.MouseEvent) {
    if (resizingElement === null) return; //IF RESIZING ELEMENT IS NOT ACTIVE

    const WidgetContainer = WidgetContainerRef.current;
    console.log(WidgetContainer?.clientWidth);

    const height = e.clientY - resizingElement.offsetTop + 10;
    const width = e.clientX - resizingElement.offsetLeft + 10;
    console.log("SETTING ATTRIBUTES");
    if (WidgetContainer === null) return;
    if (width > WidgetContainer.clientWidth) {
      resizingElement.style.width = `${WidgetContainer.clientWidth}px`;
    } else if (height > WidgetContainer.clientHeight) {
      resizingElement.style.height = `${WidgetContainer.clientHeight}px`;    
    } else {
      resizingElement.style.height = `${height}px`;
      resizingElement.style.width = `${width}px`;
    }

    /*
        setCursorLocationX(Math.floor(e.clientX-taskWidgetOffsetLeft))
        setCursorLocationY(Math.floor(e.clientY-taskWidgetOffsetTop))
        if(isBeingResized===true){
            const element = document.getElementById("task_widget") as HTMLElement;

            const height = e.clientY-taskWidgetOffsetTop+20
            const width = e.clientX-taskWidgetOffsetLeft+20

            element.style.height = `${height}px`;
            setTaskWidgetHeight(height)

            element.style.width = `${width}px`;
            setTaskWidgetWidth(width)
        }
        */
  }

  function pointerUp(e: React.MouseEvent) {
    setResizingElement(null);
  }

  return (
    <div className="dashboard">
      <div className="label">Dashboard</div>
      <div
        className="widgets"
        ref={WidgetContainerRef}
        onPointerDown={(e) => pointerDown(e)}
        onPointerMove={(e) => pointerMove(e)}
        onPointerUp={(e) => pointerUp(e)}
      >
        <TaskWidget />
      </div>
    </div>
  );
}
