import React, { useState } from "react";
import { CollectComponents } from "./CollectComponents";
import { SkyflowWrapper } from "./SkyflowWrapper";
import { Root, createRoot } from 'react-dom/client';
import RevealComponents from "./RevealComponents";

// Component to manage visibility state of Collect and Reveal forms
const ComponentWrapper: React.FC = () => {
    // State hooks for toggling component visibility
    const [showCollect, setShowCollect] = useState(false);
    const [showReveal, setShowReveal] = useState(false);

    return (
        <div>
            {/* Button container */}
            <div style={{ marginBottom: '20px' }}>
                {/* Toggle Collect form visibility */}
                <button 
                    onClick={() => setShowCollect(!showCollect)}
                    style={{ marginRight: '10px' }}
                >
                    {showCollect ? 'Hide Collect' : 'Show Collect'}
                </button>
                {/* Toggle Reveal form visibility */}
                <button 
                    onClick={() => setShowReveal(!showReveal)}
                >
                    {showReveal ? 'Hide Reveal' : 'Show Reveal'}
                </button>
            </div>
            
            {/* Conditional rendering of components */}
            {showCollect && <CollectComponents />}
            {showReveal && <RevealComponents />}
        </div>
    );
};

// Class to handle React integration with Vue
export class ReactConnector {
    // Store React root instance
    private root: Root | null = null;

    // Initialize React root with target DOM element
    constructor(targetEl: HTMLElement) {
        if (targetEl) {
            this.root = createRoot(targetEl);
        }
    }

    // Render React components with Skyflow context
    render() {
        if (this.root) {
            this.root.render(
                <SkyflowWrapper>
                    <ComponentWrapper />
                </SkyflowWrapper>
            );
        }
    }

    // Cleanup method to prevent memory leaks
    cleanup() {
        if (this.root) {
            this.root.unmount();
            this.root = null;
        }
    }
}