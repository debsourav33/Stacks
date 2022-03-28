import { Icon } from '@iconify/react';
import { Component } from "react/cjs/react.production.min";
import HeapOverFlowService from '../../../api/heapoverflow/HeapOverFlowService';

export default class VoteComponent extends Component{
    size = "30";
    colorOrange = "#f44";
    colorGray = "#999";

    constructor(props){
        super(props);
        this.state = {
            votes: 0,
            myVote: 0
        };

        this.retrieveAllandSetStates();
    }

    render(){
        return (
            <div style={{display:"inline"}}>
            <>
                <Icon icon="ic:baseline-thumb-up-alt" color={this.getUpVoteColor()} width={this.size} height={this.size} onClick = {()=> {this.onUpVoted()}}/>
            </>
            <div>
                {this.state.votes}
            </div>
            <>
                <Icon icon="ic:baseline-thumb-up-off-alt" color={this.getDownVoteColor()} width={this.size} height={this.size} rotate={2} onClick = {()=> {this.onDownVoted()}}/>
            </>
            </div>
        );
    }

    retrieveVotes = async (qid) => {
        const response = await new HeapOverFlowService().getVotes(qid);
        const votes = response.data.votes;
        console.log(`Votes for Question ${response.data.questionId}: ${votes}`);
        this.setState({votes});
    }

    retrieveMyVote = async (qid) => {
        const response = await new HeapOverFlowService().getMyVoteStatus(qid);
        const myVote = response?.data?.vote;
        this.setState({myVote});
        console.log(`My vote is ${myVote} on question ${qid}`);
    }

    postVoteToQuestion = (qid, myVote) =>{
        const ret = new Promise((resolve,reject) => {
            (async() => {
            const response = await new HeapOverFlowService().postVotes(qid, myVote);
            console.log("Vote Changed for Question:");
            console.log(response.data.question);
            resolve();
            })();
        });

        return ret;
    }

    onUpVoted = async () =>{
        let myNewVote = 0;
        switch(this.state.myVote){
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
        //this.props.voteCallback(myNewVote);
        await this.postVoteToQuestion(this.props.questionId, myNewVote);
        this.retrieveAllandSetStates();
    }

    onDownVoted = async () =>{
        let myNewVote = 0;
        switch(this.state.myVote){
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
        //this.props.voteCallback(myNewVote);
        await this.postVoteToQuestion(this.props.questionId, myNewVote);
        this.retrieveAllandSetStates();
    }

    retrieveAllandSetStates = () => {
        this.retrieveVotes(this.props.questionId);
        this.retrieveMyVote(this.props.questionId);
    }

    getUpVoteColor = () => {
        switch(this.state.myVote){
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
        switch(this.state.myVote){
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