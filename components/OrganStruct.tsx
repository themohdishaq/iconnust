import React from "react";

export default function OrgChartSection() {
  return (
    <section className="org-section">
 
        <div className="tree">
          <ul>
            <li>
              {/* Top Level */}
              <div className="node-card flex flex-col">
                <div className="node-icon grad-1">PR</div>
                <div className="node-details flex flex-col items-center">
                  <span className="node-title">Pro-Rector RIC</span>
                  <span className="node-subtitle">Executive Level</span>
                </div>
              </div>

              <ul>
                <li>
                  <div className="node-card  flex flex-col">
                    <div className="node-icon grad-2">DI</div>
                    <div className="node-details  flex flex-col">
                      <span className="node-title">Director ICON</span>
                      <span className="node-subtitle">Directorate</span>
                    </div>
                  </div>

                  <ul>
                    <li>
                      <div className="node-card  flex flex-col">
                        <div className="node-icon grad-3">GM</div>
                        <div className="node-details  flex flex-col">
                          <span className="node-title">Senior GM BD</span>
                          <span className="node-subtitle">Management</span>
                        </div>
                      </div>

                      <ul>
                        <li>
                          <div className="node-card  flex flex-col">
                            <div className="node-icon grad-4">DM</div>
                            <div className="node-details  flex flex-col">
                              <span className="node-title">Deputy Manager BD</span>
                              <span className="node-subtitle">Operations</span>
                            </div>
                          </div>
                        </li>

                        <li>
                          <div className="node-card  flex flex-col">
                            <div className="node-icon grad-4">AM</div>
                            <div className="node-details  flex flex-col">
                              <span className="node-title">
                                Assistant Manager BD
                              </span>
                              <span className="node-subtitle">Operations</span>
                            </div>
                          </div>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      

      {/* Styles */}
      <style jsx>{`
        :root {
          --line-color: #cbd5e1;
          --line-width: 2px;
        }

        


        .chart-title {
          text-align: center;
          font-size: 2.2rem;
          font-weight: 800;
          margin-bottom: 3rem;
          background: linear-gradient(135deg, #4f46e5, #ec4899);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .tree {
          display: flex;
          justify-content: center;
        }

        .tree ul {
          display: flex;
          justify-content: center;
          padding-top: 36px;
          margin: 0;
          padding-left: 0;
          position: relative;
        }

        .tree li {
          list-style: none;
          position: relative;
          padding: 36px 16px 0 16px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .tree li::before,
        .tree li::after {
          content: "";
          position: absolute;
          top: 0;
          right: 50%;
          border-top: var(--line-width) solid var(--line-color);
          width: 50%;
          height: 36px;
        }

        .tree li::after {
          right: auto;
          left: 50%;
          border-left: var(--line-width) solid var(--line-color);
        }

        .node-card {
          background: rgba(255, 255, 255, 0.85);
          backdrop-filter: blur(12px);
          padding: 12px 18px;
          border-radius: 16px;
          display: flex;
          align-items: center;
          gap: 12px;
          min-width: 240px;
          box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.08);
          transition: 0.3s;
        }

        .node-card:hover {
          transform: translateY(-6px) scale(1.02);
          box-shadow: 0 20px 40px -10px rgba(99, 102, 241, 0.25);
        }

        .node-icon {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
          color: white;
          font-weight: 700;
        }

        .grad-1 {
          background: linear-gradient(135deg, #4f46e5, #7c3aed);
        }
        .grad-2 {
          background: linear-gradient(135deg, #0ea5e9, #3b82f6);
        }
        .grad-3 {
          background: linear-gradient(135deg, #14b8a6, #059669);
        }
        .grad-4 {
          background: linear-gradient(135deg, #f59e0b, #ea580c);
        }

        .node-title {
          font-weight: 700;
          color: #0f172a;
        }

        .node-subtitle {
          font-size: 12px;
          color: #64748b;
          text-transform: uppercase;
        }

        @media (max-width: 768px) {
          .node-card {
            flex-direction: column;
            text-align: center;
            min-width: auto;
          }
        }
      `}</style>
    </section>
  );
}