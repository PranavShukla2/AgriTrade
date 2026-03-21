import { motion } from 'framer-motion';
import { ArrowRight, BarChart3, Globe2, ShieldCheck, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

const fadeIn = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2
        }
    }
};

export function LandingPage() {
    return (
        <div className="bg-white text-gray-900 pt-16 selection:bg-indigo-100 selection:text-indigo-900">

            {/* Hero Section */}
            <section className="relative overflow-hidden min-h-[90vh] flex items-center justify-center bg-gray-50/50">
                <div className="absolute inset-0 z-0">
                    {/* Subtle animated background gradient */}
                    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
                    <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
                    <div className="absolute -bottom-8 left-1/3 w-96 h-96 bg-emerald-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
                </div>

                <motion.div
                    className="relative z-10 max-w-5xl mx-auto px-4 text-center"
                    initial="hidden"
                    animate="visible"
                    variants={staggerContainer}
                >
                    <motion.div variants={fadeIn} className="inline-flex items-center space-x-2 bg-white rounded-full px-4 py-1.5 shadow-sm border border-gray-100 mb-8 text-sm font-medium text-slate-600">
                        <span className="flex h-2 w-2 relative">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                        </span>
                        <span>AgriTrade Platform v1.0 Live</span>
                    </motion.div>

                    <motion.h1 variants={fadeIn} className="text-6xl md:text-8xl font-black tracking-tight text-slate-900 mb-8 leading-[1.1]">
                        Unlock agricultural <br className="hidden md:block" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-500">alpha.</span>
                    </motion.h1>

                    <motion.p variants={fadeIn} className="text-xl md:text-2xl text-slate-500 mb-12 max-w-3xl mx-auto leading-relaxed font-light">
                        Real-time NLP sentiment analysis fused with localized commodity pricing. Discover hidden cross-market arbitrage opportunities instantly.
                    </motion.p>

                    <motion.div variants={fadeIn} className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
                        <Link to="/dashboard" className="w-full sm:w-auto px-8 py-4 bg-slate-900 text-white rounded-full font-medium text-lg hover:bg-indigo-600 hover:shadow-lg hover:shadow-indigo-500/30 transition-all transform hover:-translate-y-1 flex items-center justify-center space-x-2">
                            <span>Enter Dashboard</span>
                            <ArrowRight className="w-5 h-5" />
                        </Link>
                        <a href="#features" className="w-full sm:w-auto px-8 py-4 bg-white text-slate-900 border border-slate-200 rounded-full font-medium text-lg hover:border-slate-300 hover:bg-slate-50 transition-all flex items-center justify-center space-x-2">
                            <Zap className="w-5 h-5 text-amber-500" />
                            <span>See How It Works</span>
                        </a>
                    </motion.div>
                </motion.div>
            </section>

            {/* Feature Bento Grid */}
            <section id="features" className="py-32 px-4 max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-20"
                >
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-4">Intelligence at scale.</h2>
                    <p className="text-xl text-slate-500 max-w-2xl mx-auto font-light">Built for traders and enterprises who demand sub-second latency and institutional-grade analytics.</p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
                        className="md:col-span-2 bg-gradient-to-br from-indigo-50 to-white p-10 rounded-3xl border border-indigo-100 flex flex-col justify-between overflow-hidden relative group"
                    >
                        <div className="relative z-10">
                            <div className="h-12 w-12 bg-indigo-600 rounded-2xl flex items-center justify-center mb-6 shadow-sm">
                                <BarChart3 className="text-white w-6 h-6" />
                            </div>
                            <h3 className="text-3xl font-bold text-slate-900 mb-4">NLP Sentiment Mapping</h3>
                            <p className="text-lg text-slate-600 max-w-md font-light">Our FinBERT pipelines continuously ingest government policy changes, weather anomalies, and global news to chart momentum preemptively.</p>
                        </div>

                        {/* Abstract Decorative Element */}
                        <div className="absolute right-0 bottom-0 w-64 h-64 bg-indigo-100/50 rounded-tl-full transform translate-x-12 translate-y-12 group-hover:scale-110 transition-transform duration-700 ease-out"></div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
                        className="bg-gradient-to-b from-slate-50 to-white p-10 rounded-3xl border border-slate-100 flex flex-col justify-between group"
                    >
                        <div>
                            <div className="h-12 w-12 bg-slate-900 rounded-2xl flex items-center justify-center mb-6 shadow-sm">
                                <Globe2 className="text-white w-6 h-6" />
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900 mb-4">Cross-Mandi Arbitrage</h3>
                            <p className="text-slate-600 font-light">Automatically identify price dislocations across isolated regional agricultural markets.</p>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}
                        className="bg-gradient-to-br from-emerald-50 to-white p-10 rounded-3xl border border-emerald-100 flex flex-col justify-between group"
                    >
                        <div>
                            <div className="h-12 w-12 bg-emerald-500 rounded-2xl flex items-center justify-center mb-6 shadow-sm">
                                <ShieldCheck className="text-white w-6 h-6" />
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900 mb-4">Real-time Sockets</h3>
                            <p className="text-slate-600 font-light">Lightning-fast execution via WebSocket connections wired directly to our core.</p>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 }}
                        className="md:col-span-2 bg-gradient-to-r from-slate-900 to-slate-800 p-10 rounded-3xl border border-slate-700 flex flex-col justify-between overflow-hidden relative text-white"
                    >
                        <div className="relative z-10">
                            <h3 className="text-3xl font-bold mb-4">Stop guessing. Start calculating.</h3>
                            <p className="text-lg text-slate-300 max-w-md font-light mb-8">Access the dashboard now to see live market data in action.</p>

                            <Link to="/dashboard" className="inline-flex items-center space-x-2 bg-white text-slate-900 px-6 py-3 rounded-full font-medium hover:bg-indigo-50 transition-colors">
                                <span>View Dashboard</span>
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Footer */}
            <footer className="border-t border-slate-100 bg-white py-12 text-center text-slate-500 text-sm">
                <p>© 2026 AgriTrade.AI. Formulated for high-frequency agricultural strategy.</p>
            </footer>
        </div>
    );
}
