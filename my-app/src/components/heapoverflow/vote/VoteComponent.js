import { Icon } from '@iconify/react';
import { Component } from "react/cjs/react.production.min";

export default class VoteComponent extends Component{
    size = "30";
    colorOrange = "#f44";
    colorGray = "#999";

    constructor(props){
        super(props);
        this.state = {
            upVoteColor: this.colorGray,
            downVoteColor : this.colorGray 
        };
    }

    render(){
        return (
            <div style={{display:"inline"}}>
            <>
                <Icon icon="ic:baseline-thumb-up-alt" color={this.getUpVoteColor()} width={this.size} height={this.size} onClick = {()=> {this.onUpVoted()}}/>
            </>
            <div>
                {this.props.votes}
            </div>
            <>
                <Icon icon="ic:baseline-thumb-up-off-alt" color={this.getDownVoteColor()} width={this.size} height={this.size} rotate={2} onClick = {()=> {this.onDownVoted()}}/>
            </>
            </div>
        );
    }

    onUpVoted = () =>{
        let myNewVote = 0;
        switch(this.props.myVote){
            case 0:
                myNewVote = 1;
                break;
            case -1:
                myNewVote = 1;
                break;
            case 1:
                myNewVote = 0;
                break;
            default:
                break;
        }
        this.props.voteCallback(myNewVote);
    }

    onDownVoted = () =>{
        let myNewVote = 0;
        switch(this.props.myVote){
            case 0:
                myNewVote= -1;
                break;
            case 1:
                myNewVote= -1;
                break;
            case -1:
                myNewVote= 0;
                break;
            default:
                break;
        }
        this.props.voteCallback(myNewVote);
    }

    getUpVoteColor = () => {
        switch(this.props.myVote){
            case 0:
            case -1:
                return this.colorGray;
            case 1:
                return this.colorOrange;
            default:
                return this.colorGray;
        }
    }

    getDownVoteColor = () => {
        switch(this.props.myVote){
            case 0:
            case 1:
                return this.colorGray;
            case -1:
                return this.colorOrange;
            default:
                return this.colorGray;
        }
    }
}