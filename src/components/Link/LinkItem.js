import React, {useState} from "react";
import {Link, withRouter} from 'react-router-dom'
import {getDomain} from '../../utils'
import distanceToWordsToNow from 'date-fns/distance_in_words_to_now'
import {FirebaseContext} from "../../firebase";
import { linkSync } from "fs";
import { ReactComponent as Like } from '../../images/love.svg';
import { ReactComponent as Comment } from '../../images/comment.svg';

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
            <div className="card-header" >
            {link.postedBy.name}
            </div>
            <div class="card-body">
                <h5 class="card-title">{link.title}</h5>
                <p class="card-text">{link.description}</p>
                <a href="#" class="btn btn-primary check-btn">Check Story</a>
                <div className="di flex justify-end">
                {link.votes.length}
                <Like className="like" onClick={handleVote}/>
                 {link.comments.length}
                 <Comment className="like comment"/>
            </div>
            </div>
            
        </div>

    )

}

export default withRouter(LinkItem);

// <div className="flex card">     <div className="ml1">         <div>
//   <a href={link.url} className="black no-underline">{link.description}</a>
//          <span className="link">                 ({getDomain(link.url)})
//        </span>         </div>         <div className="f6 flex items-end
// lh-copy gray">           <div className="mr1"> {link.votes.length} votes by
// {link.postedBy.name} {distanceToWordsToNow(link.created)} </div>           {"
// | "}           <Link to={`/link/${link.id}`}>
// {link.comments.length > 0 ? `${link.comments.length} comments`             :
// "discuss"           }           </Link>           {postedByAuthUser && (
//        <>             <span className="delete-button ml1"
// onClick={handleDeleteLink}> Delete </span>             </>           )}
//   </div>         <div className="flex items-end">         {showCount && <span
// className="gray">{index}.</span>}         <div onClick={handleVote}
// className="vote-button">             up         </div>     </div>     </div>
// </div>