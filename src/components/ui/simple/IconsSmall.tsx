import { IoBuildOutline, IoServerOutline, IoAccessibilityOutline, IoAnalyticsOutline, IoChevronForwardOutline,
    IoExtensionPuzzleOutline, IoSearch } from 'react-icons/io5'

import { GoSmiley } from 'react-icons/go'

//import { VscArrowSmallRight } from 'react-icons/vsc'
//import { LuMoveRight } from 'react-icons/lu'
import { HiArrowNarrowRight } from 'react-icons/hi'

const size = 'w-[1.2rem] h-[1.2rem]'

// - - - - - Icons - - - - //

export const DataIcon = <IoAnalyticsOutline className={size} />

export const DbIcon = <IoServerOutline className={size} />

export const ToolIcon = <IoBuildOutline className={size} />

export const UserIcon = <IoAccessibilityOutline className={size} />

export const PuzzleIcon = <IoExtensionPuzzleOutline className={size} />

export const RightIcon = <IoChevronForwardOutline className={size} />

export const SearchIcon = <IoSearch className={size} />

export const SmileIcon = <GoSmiley className={size} />

export const ArrowSmallRightIcon = <HiArrowNarrowRight className={size} />

