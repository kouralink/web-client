// MatchHistory.tsx
import React, { useEffect, useRef, useState } from 'react';
import { FilterProgressStatus, Match } from "@/types/types";
import { ScrollArea } from "@/components/ui/scroll-area";
import MatchRecordCardIteam from "@/components/global/cards/MatchRecordCardIteam";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from '@/components/ui/card';
import { AppDispatch, RootState } from '@/state/store';
import { useDispatch, useSelector } from 'react-redux';
import { getTeamMatchesHistory } from '@/state/team/teamSlice';

interface MatchHistoryProps {
    teamId: string;
    // matchesHistory: Match[];
    // isLoading: boolean;
    // trackQuery: any;
    // setStatus: React.Dispatch<SetStateAction<FilterProgressStatus>>;
    // setObserverRef: React.Dispatch<React.SetStateAction<HTMLDivElement | null>>;
}

const MatchHistory: React.FC<MatchHistoryProps> = ({ teamId }) => {
    const matchesHistory = useSelector(
        (state: RootState) => state.team.MatchesHistory
    );
    const trackQuery = useSelector(
        (state: RootState) => state.team.trackQuery
    );
    const isLoading = useSelector(
        (state: RootState) => state.team.status === "loading"
    );
    const [status, setStatus] = useState<FilterProgressStatus>(null);
    const observerRef = useRef<HTMLDivElement>(null);
    const firstRender = useRef(true);
    const dispatch = useDispatch<AppDispatch>();



    //! Team Handle scroll event to fetch more matches
    useEffect(() => {
        if (firstRender.current || isLoading || matchesHistory.length === 0) {
            firstRender.current = false;
            return;
        }
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                fetchTeamMatchesHistory();
            }
        });
        if (observerRef.current) {
            observer.observe(observerRef.current);
        }
        return () => observer.disconnect();
    }, [isLoading, matchesHistory.length, observerRef.current]);


    // updating team matches history
    useEffect(() => {
        if (status !== null) {
            fetchTeamMatchesHistory()
        }
    }, [dispatch, teamId, status]);

    const fetchTeamMatchesHistory = () => {
        console.log({ teamId: teamId, status: status })
        dispatch(getTeamMatchesHistory({ teamId: teamId, status: (status ? status : "all") }));
    }

    return (
        <Card className="flex flex-col gap-2 p-4 w-full lg:w-fit">
            <h2>Match History</h2>
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
                    matchesHistory.length === 0 &&
                    <div className="text-muted-foreground ps-6">
                        No Matches History Found
                    </div>
                }
                <ScrollArea className="h-96 w-full">
                    <div className="flex flex-col gap-4 pr-6 w-full">
                        {matchesHistory.map((match: Match) => (
                            <MatchRecordCardIteam key={match.id} {...match} />
                        ))}
                        {isLoading && (
                            <div className='h-full w-full flex justify-center items-center'>
                                <img src="/logo.svg" className="h-8 me-3 my-5 animate-spin" alt="Koulaink Logo" />
                            </div>
                        )}
                        {trackQuery.lastDoc && <div ref={observerRef} style={{ height: '20px', visibility: 'visible' }} />}
                    </div>
                </ScrollArea>
            </>
        </Card>
    );
};

export default MatchHistory;