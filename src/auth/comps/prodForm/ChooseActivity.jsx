import React from 'react'

const ChooseActivity = ({setState,state,type}) => {
    return (
        <div className="border-b border-gray-900/10 pb-12">
            <div className="mt-10 space-y-10">
                <fieldset>
                    <legend className="text-sm font-semibold leading-6 text-gray-900">Choose activity</legend>
                    <p className="mt-1 text-sm leading-6 text-gray-600">Click to display or hide {type} in store.</p>
                    <div className="mt-6 space-y-6">
                        <div className="flex items-center gap-x-3">
                            <input
                                onChange={(e) => setState({ ...state, activity: e.target.value })}
                                checked={state?.activity === 'active'}
                                value="active"
                                id="active"
                                name="activity"
                                type="radio"
                                className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                            />
                            <label htmlFor="active" className="block text-sm font-medium leading-6 text-gray-900">
                                Active (show)
                            </label>
                        </div>
                        <div className="flex items-center gap-x-3">
                            <input
                                onChange={(e) => setState({ ...state, activity: e.target.value })}
                                checked={state?.activity === 'draft'}
                                value="draft"
                                id="draft"
                                name="activity"
                                type="radio"
                                className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                            />
                            <label htmlFor="draft" className="block text-sm font-medium leading-6 text-gray-900">
                                Draft (hide)
                            </label>
                        </div>
                    </div>
                </fieldset>
            </div>
        </div>
    )
}

export default ChooseActivity