import React, {useState} from "react";
import {Link, withRouter} from 'react-router-dom'
import {getDomain} from '../../utils'
import distanceToWordsToNow from 'date-fns/distance_in_words_to_now'
import {FirebaseContext} from "../../firebase";
import {linkSync} from "fs";
import {ReactComponent as Like} from '../../images/love.svg';
import {ReactComponent as Comment} from '../../images/comment.svg';

function LinkItem({index, showCount, link, history}) {

    const {firebase, user} = React.useContext(FirebaseContext)

    function handleVote() {
        if (!user) {
            history.push('/login')
        } else {
            const voteRef = firebase
                .db
                .collection('links')
                .doc(link.id)
            voteRef
                .get()
                .then(doc => {
                    if (doc.exists) {
                        const previousVotes = doc
                            .data()
                            .votes;
                        const vote = {
                            votedBy: {
                                id: user.uid,
                                name: user.displayName
                            }
                        }
                        const updatedVotes = [
                            ...previousVotes,
                            vote
                        ]
                        voteRef.update({votes: updatedVotes})
                    }
                })
        }
    }

    const postedByAuthUser = user && user.uid === link.postedBy.id

    function handleDeleteLink() {
        const linkRef = firebase
            .db
            .collection('links')
            .doc(link.id)
        linkRef
            .delete()
            .then(() => {
                try {
                    console.log("Error Deleting Document")
                } catch (e) {
                    console.log("Error Deleting Document", e)
                }
            })
    }

    return (
        <div class="card border-success">
            <div className=" card-header">
                <div>
                {link.postedBy.name}
                </div>
                
            </div>
           
            <div class="card-body">
                <div className="flex justify-between"><h5 class="card-title">{link.title}</h5>
                <p className="flex justify-end time">{distanceToWordsToNow(link.created)} ago</p>
                    </div>
                <p class="card-text">{link.description}</p>
                <a href={link.url} class="btn btn-primary check-btn">Check Story</a>
                <div className="di flex icons justify-end">
                    {link.votes.length}
                    <Like className="like" onClick={handleVote}/> {link.comments.length}
                    <Link to={`/link/${link.id}`}><Comment className="like comment"/></Link>
                    <Link className="link comment-main" to={`/link/${link.id}`}>
                        {link.comments.length > 0
                            ? `${link.comments.length} comments`
                            : "discuss"}
                    </Link>
                </div>
                {postedByAuthUser && (
                    <div>
                        <span className="delete-button ml1 mb7" onClick={handleDeleteLink}>
                            <div>
                            Delete
                            </div>
                            
                        </span>
                       
                    </div>
                )}
              
            </div>

        </div>

    )

}

export default withRouter(LinkItem);
