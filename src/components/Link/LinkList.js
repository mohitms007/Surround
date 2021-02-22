import React, {useState} from "react";
import FirebaseContext from "../../firebase/context";
import LinkItem from "./LinkItem";

function LinkList(props) {
    const {firebase} = React.useContext(FirebaseContext);
    const [links,
        setLinks] = React.useState([]);
    const [cursor,
        setCursor] = useState(null)
    const isNewPage = props
        .location
        .pathname
        .includes("new")

    const isTopPage = props
        .location
        .pathname
        .includes("top")
    const page = Number(props.match.params.page)

    React.useEffect(() => {
        const unsubscribe = getLinks();
        return () => unsubscribe();
    }, [isTopPage, page]);

    function getLinks() {
        const hasCursor = Boolean(cursor)
        if (isTopPage) {
            return firebase
                .db
                .collection("links")
                .orderBy('votes', 'desc')
                .limit(7)
                .onSnapshot(handleSnapshot);
        } else if (page === 1) {
            return firebase
                .db
                .collection("links")
                .orderBy('created', 'desc')
                .limit(7)
                .onSnapshot(handleSnapshot);
        } else if (hasCursor) {
            return firebase
                .db
                .collection("links")
                .orderBy('created', 'desc')
                .startAfter(cursor.created)
                .limit(7)
                .onSnapshot(handleSnapshot);
        }

    }

    function visitPreviousPage() {
        if (page > 1) {
            props
                .history
                .push(`/new/${page - 1}`)
        }
    }

    function visitNextPage() {
        if (page <= links.length / 7) {
            props
                .history
                .push(`/new/${page + 1}`)
        }
    }

    function handleSnapshot(snapshot) {
        const links = snapshot
            .docs
            .map(doc => {
                return {
                    id: doc.id,
                    ...doc.data()
                };

            });
        setLinks(links);
        const lastLink = links[links.length - 1]
        setCursor(lastLink)
    }

    function renderLinks() {
        if (isNewPage) {
            return links
        }
        const topLinks = links
            .slice()
            .sort((l1, l2) => l2.votes.length - l1.votes.length);
        return topLinks
    }
    const pageIndex = page
        ? (page - 1) * 6 + 1
        : 0;
    return (
        <div className="flex card-items flex-column items-center">
            {renderLinks().map((link, index) => (<LinkItem key={link.id} showCount={true} link={link} index={index + pageIndex}/>))}
            {isNewPage && (
                <div className="pagination">
                    <div className="pointer mr2" onClick={visitPreviousPage}>
                        Previous</div>
                    <div className="pointer mr2" onClick={visitNextPage}>
                        Next</div>
                </div>
            )}
        </div>
    );
}

export default LinkList;
