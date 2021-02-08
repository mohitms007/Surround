import React from "react";
import LinkItem from "./LinkItem";
import FirebaseContext from "../../firebase/context";

function SearchLinks() {
    const {firebase} = React.useContext(FirebaseContext);
    const [filteredLinks,
        setFilteredLinks] = React.useState([]);
    const [links,
        setLinks] = React.useState([]);
    const [filter,
        setFilter] = React.useState("");

    React.useEffect(() => {
        getInitialLinks();
    }, []);

    function getInitialLinks() {
        firebase
            .db
            .collection("links")
            .get()
            .then(snapshot => {
                const links = snapshot
                    .docs
                    .map(doc => {
                        return {
                            id: doc.id,
                            ...doc.data()
                        };
                    });
                setLinks(links);
            });
    }

    function handleSearch(event) {
        event.preventDefault();
        const query = filter.toLowerCase();
        const matchedLinks = links.filter(link => {
            return (link.description.toLowerCase().includes(query) || link.url.toLowerCase().includes(query) || link.postedBy.name.toLowerCase().includes(query));
        });
        setFilteredLinks(matchedLinks);
    }

    return (
        <div>

            <form onSubmit={handleSearch} className="flex justify-center items-baseline">
                <input className="search" placeholder="Search"/>
                <button className="button flex flex-column  btn-submit">OK</button>
            </form>
            <div className="flex flex-column items-center">
                {filteredLinks.map((filteredLink, index) => (<LinkItem
                    key={filteredLink.id}
                    link={filteredLink}
                    showCount={false}
                    index={index}/>))}
            </div>
        </div>
    )
}

export default SearchLinks;

// return (   <div>       <form className="flex justify-center items-baseline">
//         <input className="search" placeholder="Search"/>           <button
// className="button flex flex-column  btn-submit">OK</button>       </form>
// {filteredLinks.map((filteredLink, index) => (       <LinkItem
// key={filteredLink.id} showCount={false} index={index} />    ))}   </div> )