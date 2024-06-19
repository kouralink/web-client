// MatchHistory.tsx
import React, { useEffect, useRef, useState } from 'react';
import { FilterProgressStatus } from "@/types/types";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from '@/components/ui/card';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/state/store';
import { getRefreeTournamentsHistory, setSearchResults, setTrackQuery } from '@/state/search/searchTournamentSlice';
import TournamentCardIteam from '../cards/TournamentCardIteam';

interface TournamentHistoryProps {
    refreeId: string;
}

const RefreeTournamentsHistory: React.FC<TournamentHistoryProps> = ({ refreeId }) => {


    const [status, setStatus] = useState<FilterProgressStatus>("all");
    const tournamentsHistory = useSelector((state: RootState) => state.tournamentsearch.searchResults);
    const isLoading = useSelector((state: RootState) => state.tournamentsearch.isLoading);
    const trackQuery = useSelector((state: RootState) => state.tournamentsearch.trackQuery);
    const observerRef = useRef<HTMLDivElement>(null);
    const firstRender = useRef(true);
    const dispatch = useDispatch<AppDispatch>();


    //! Tournament Handle scroll event to fetch more matches
    useEffect(() => {
        console.log("observe")
        if (firstRender.current || isLoading || tournamentsHistory.length === 0) {
            firstRender.current = false;
            return;
        }
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                console.log("Scrollllllllll Tournament")
                fetchTeamTournamentsHistory();
            }
        });
        if (observerRef.current) {
            observer.observe(observerRef.current);
        }
        return () => observer.disconnect();
    }, [isLoading, tournamentsHistory.length]);


    // updating tournaments history
    useEffect(() => {
        if (status !== null) {
            fetchTeamTournamentsHistory()
        }
    }, [dispatch, refreeId, status]);

    const fetchTeamTournamentsHistory = () => {
        dispatch(getRefreeTournamentsHistory({ uid: refreeId, status: (status ? status : "all") }));
    }

    useEffect(() => {
        if (refreeId) {
            dispatch(setSearchResults([]));
            dispatch(setTrackQuery({ lastDoc: null, status: "all" }));
            dispatch(getRefreeTournamentsHistory({ uid: refreeId, status: "all" }));
        }
    }, [dispatch, refreeId]);

    return (
        <Card className="flex flex-col gap-2 p-4 !w-full lg:w-fit">
            <h2>Tournament History</h2>
            <Tabs defaultValue="all" className="space-y-4">
                <TabsList>
                    {["all", "pending", "in_progress", "finish", "cancled"].map(
                        (status) => (
                            <TabsTrigger
                                key={status}
                                onClick={() => setStatus(status as FilterProgressStatus)}
                                value={status}
                            >
                                {status.charAt(0).toUpperCase() + status.slice(1)}
                            </TabsTrigger>
                        )
                    )}
                </TabsList>
            </Tabs>
            <>
                {
                    tournamentsHistory.length === 0 &&
                    <div className="text-muted-foreground ps-6">
                        No Tournaments History Found
                    </div>
                }
                <ScrollArea className="h-96 w-full">
                    <div className="flex flex-col gap-4 pr-6 w-full">
                        {tournamentsHistory.map(tournament => (
                            // <div key={tournament.id}>
                            //     <h2>{tournament.tournament_info.name}</h2>
                            //     <p>{tournament.tournament_info.description}</p>
                            // </div>
                            <TournamentCardIteam key={tournament.id} {...tournament.tournament_info} />
                        ))}
                        {isLoading && (
                            <div className='h-full w-full flex justify-center items-center'>
                                <img src="/logo.svg" className="h-8 me-3 my-5 animate-spin" alt="Koulaink Logo" />
                            </div>
                        )}
                        {trackQuery.lastDoc && <div ref={observerRef} style={{ height: '10px', visibility: 'visible' }} />}
                    </div>
                </ScrollArea>
            </>
        </Card>
    );
};


export default RefreeTournamentsHistory;