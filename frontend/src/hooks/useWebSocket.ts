import { useEffect, useRef } from 'react';
import { useAppStore } from '../store/appStore';
import { ArbitrageOpportunity } from '../types';

export function useWebSocket(url: string) {
    const { addOpportunity } = useAppStore();
    const ws = useRef<WebSocket | null>(null);

    useEffect(() => {
        // Connect to the WebSocket
        ws.current = new WebSocket(url);

        ws.current.onopen = () => {
            console.log('Connected to Arbitrage WebSocket engine.');
        };

        ws.current.onmessage = (event) => {
            try {
                const data: ArbitrageOpportunity = JSON.parse(event.data);
                addOpportunity(data);
            } catch (error) {
                console.error("Failed to parse websocket message:", error);
            }
        };

        ws.current.onclose = () => {
            console.log('Disconnected from Arbitrage WebSocket engine.');
        };

        // Cleanup on unmount
        return () => {
            if (ws.current) {
                ws.current.close();
            }
        };
    }, [url, addOpportunity]);

    return ws;
}
