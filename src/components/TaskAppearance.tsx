import {ITaskState, ITaskAppearanceState} from "./TaskInterfaces";
import * as React from "react";
import {Helpers} from "./Helpers";

export class TaskAppearance extends React.Component<ITaskState, ITaskAppearanceState> {

    constructor(props: ITaskState) {
        super(props);

        this.state = {
            editing: false,
        };
    }

    public renderTitle(title: string): string {
        return title.length === 0 ? '<Untitled Task>' : title;
    }

    public edit(element: HTMLElement): void {
        this.setState({ editing: true }, () => element.focus());
    }

    public cancel(element: HTMLElement): void {
        this.setState({ editing: false });
        element.textContent = this.renderTitle(this.props.title);
    }

    public toggleEdit(e: React.SyntheticEvent<HTMLElement>): void {
        e.stopPropagation();
        if (this.state.editing) {
            this.cancel(e.currentTarget);
        }
        else {
            this.edit(e.currentTarget);
        }
    }

    public save(e: React.SyntheticEvent<HTMLElement>): void {
        this.props.renameTaskEvent(e, this.props.guid, e.currentTarget.textContent)
        this.setState({ editing: false });
    }

    public handleKeyDown(e: React.KeyboardEvent<HTMLElement>): void {

        switch (e.key) {
            case 'Enter':
                this.save(e);
                break;
            case 'Escape':
                this.cancel(e.currentTarget);
                break;
        }
    }

    public render(): JSX.Element {
        const isRunning = this.props.lastRunTime !== 0;
        const editing = this.state.editing;
        return (
            <div>
                <span onClick={e => this.toggleEdit(e)}
                    className={editing ? 'editing' : ''}
                    contentEditable={editing}
                    onKeyDown={(e) => this.handleKeyDown(e)}
                    suppressContentEditableWarning={true}
                    onBlur={(e) => this.save(e)}
                >
                    {this.renderTitle(this.props.title)}
                </span>
                <span > : {Helpers.getPrettyfiedTime(this.props)}</span>
                <button className={isRunning ? 'button-red' : 'button-green'} onClick={e => this.props.startPauseEvent(e, this.props.guid, !isRunning)}><i className={isRunning ? "fa fa-pause" : "fa fa-play"}></i>{isRunning ? 'Stop' : 'Start'}
                </button>
                <button className="button-red" onClick={e => this.props.removeEvent(e, this.props.guid)}><i className="fa fa-minus-circle" aria-hidden="true"></i>Remove</button>
            </div>
        );
    }
}