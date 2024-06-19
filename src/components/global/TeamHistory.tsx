// MatchHistory.tsx
import React, { useEffect, useRef, useState } from 'react';
import { FilterProgressStatus, TrackQuery } from "@/types/types";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from '@/components/ui/card';
import { AppDispatch } from '@/state/store';
import { useDispatch } from 'react-redux';

interface TeamHistoryProps<T> {
    teamId: string;
    title: string;
    dataHistory: T[];
    isLoading: boolean;
    trackQuery: TrackQuery;
    children: (item: T) => React.ReactNode;
    fetchHistory: (payload: { teamId: string, status: FilterProgressStatus }) => void; // new prop
}

const TeamHistory = <T,>({ teamId, title, dataHistory, isLoading, trackQuery, children, fetchHistory }: TeamHistoryProps<T>) => {


    const [status, setStatus] = useState<FilterProgressStatus>("all");
    const observerRef = useRef<HTMLDivElement>(null);
    const firstRender = useRef(true);
    const dispatch = useDispatch<AppDispatch>();


    //! Refree Handle scroll event to fetch more data
    useEffect(() => {
        if (firstRender.current || isLoading || dataHistory.length === 0) {
            firstRender.current = false;
            return;
        }
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                fetchRefreedataHistory();
            }
        });
        if (observerRef.current) {
            observer.observe(observerRef.current);
        }
        return () => observer.disconnect();
    }, [isLoading, dataHistory.length, observerRef.current]);


    // updating data history
    useEffect(() => {
        if (status !== null) {
            fetchRefreedataHistory()
        }
    }, [dispatch, teamId, status]);

    const fetchRefreedataHistory = () => {
        console.log({ teamId: teamId, status: status })
        fetchHistory({ teamId: teamId, status: (status ? status : "all") });
    }

    return (
        <Card className="flex flex-col gap-2 p-4 w-full lg:w-fit">
            <h2>{title} History</h2>
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
                    dataHistory.length === 0 &&
                    <div className="text-muted-foreground ps-6">
                        No {title} History Found
                    </div>
                }
                <ScrollArea className="h-96 w-full">
                    <div className="flex flex-col gap-4 pr-6 w-full">
                        {
                            dataHistory.map((data: T) => (
                                children(data)
                            ))
                        }
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

export default TeamHistory;