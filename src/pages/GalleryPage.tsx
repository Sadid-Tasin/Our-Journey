<div className="flex justify-center mb-8">
    {session ? (
        <div className="flex items-center gap-3">
            <label className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-rose-500 text-white text-sm font-medium cursor-pointer hover:bg-rose-600 transition-colors shadow-md">
                <FaPlus />
                <span>{uploading ? 'Uploading...' : `Add photos to "${activeFolder}"`}</span>
                <input
                    type="file"
                    accept="image/*"
                    multiple
                    hidden
                    disabled={uploading}
                    onChange={handleUpload}
                />
            </label>
            <button
                onClick={() => supabase.auth.signOut()}
                className="p-2.5 rounded-full bg-white/80 text-rose-500 hover:bg-rose-100"
                title="Logout"
            >
                <FaSignOutAlt />
            </button>
        </div>
    ) : (
        <button
            onClick={() => setShowLogin(true)}
            className="p-2.5 rounded-full bg-white/60 text-rose-300 hover:text-rose-500 transition-colors"
            title="Admin login"
        >
            <FaLock />
        </button>
    )}
</div>

{showLogin && !session && (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4" onClick={() => setShowLogin(false)}>
        <div className="bg-white rounded-2xl p-6 w-full max-w-sm space-y-3" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-lg font-semibold text-rose-600">Admin login</h3>
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-rose-200 rounded-lg px-3 py-2"
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-rose-200 rounded-lg px-3 py-2"
            />
            <button onClick={handleLogin} className="w-full bg-rose-500 text-white rounded-lg py-2 font-medium">
                Login
            </button>
        </div>
    </div>
)}
