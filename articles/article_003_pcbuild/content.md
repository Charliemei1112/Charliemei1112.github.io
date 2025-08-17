## Introduction
After enormous research throughout, I have finally decided my PC Build configuration. Throughout this article, I will include my pc part choice and detailed step-by-step pc installation. This article will be used as my personal reference when building my PC and also records for anyone who is also interesting in configuring their own PC.

## Configuration
- **CPU**: Intel Ultra 7 265K
- **RAM**: G.Skill Trident Z5 RGB 64GB (2 × 32GB) DDR5 6400MT/s CL32-39-39-102
- **Storage**: Samsung 990 Pro 4TB (PCIe 4.0 ×4)
- **Motherboard**: MSI MPG Z890 Carbon Wifi
- **CPU Cooler**: PCCooler CPS RZ820 Dual Tower (8 heat pipes, 290W TDP)
- **Graphics Card**: Nvidia RTX 4070 Super
- **Case**: Lian Li LANCOOL 217 ATX-Mid Tower (57.7L)
- **Power Supply**: MSI MPG A1250GS ATX 3.1 PCIe 5.1, 80+ Gold
- **Operating Systems**: Windows 11 Pro & RHEL Linux 9.6
- **Monitor**: Acer 24″ 1920×1080 100Hz
- **Accessories**: Wireless Mouse & Keyboard, Wireless Speaker, Microphone, WebCam
- **Tool**: Screwdriver Kit, Cable Zip Tie

## Prepare Workspace
1. Prepare Windows 11 Pro & RHEL Linux 9.6 USB Flash Drive
2. Prepare MSI MPG Carbon Wifi BIOS Flash Drive
3. Find a large and clear space for setup, preferred with air conditioning
4. Ground yourself to avoid static (touch a metal object or use an anti-static wrist strap).
5. Open the motherboard box and place the motherboard on top of the box.
6. Place the case on its side with the motherboard tray facing up.

## PC Case Preparation
- Remove the right side panel, the front mesh panel, the top panel, the side glass panel, the bottom side mesh panel, and the dust filter. (Page 1)
- Install the front dust filter to the front mesh panel, and install the front mesh panel back to the case. This will slightly reduce cooling capability but I am going to ignore this (Page 18)
- Review the fan hub connection. The 4-pin system fan goes to SYS_FAN1 on the motherboard, the 3-pin RGB goes to the 5V-3pin connector on the motherboard (JARGB_V2_2), and the other to the Power Supply through the SATA cable.
- Remove the 140mm Fan from the front panel by unscrewing the four screws that tighten them. Unplug the fan connector FAN1 pin from the case. This will provide more space for motherboard installation
- Mount the 2 * 120mm fans below by flipping the rubber screws to the other side.
- Check to see if the motherboard's screw holes match with the ones on the case panel. No change was made in this step since Lian Li Lancool 217 is configured for ATX motherboards already.
- Install the power supply with the fan facing down and power plug to the side panel (therefore the power cable will face the backside, providing more space for cable management and will be compatible with all the HDD cages and fans mounted below). Connect the extension plugging cable to the power supply around the box.
- Place all of the panels removed in step 1 back to its place.

## CPU Installation
1. Lift the small metal lever on the CPU socket to open the retainer.
2. Remove the black protective cover (keep it for warranty purposes).
3. Align the triangle and the notches between the CPU and sockets marked on the motherboard.
4. Gently place the CPU into the socket without pushing, be careful since this is one of the most delicate components of the motherboard.
5. Lower the socket retainer plate back down, the black protective cover will fall off automatically, keep it for warranty purposes.
6. Press the metal lever down to lock the cpu socket.

## RAM Installation (Channel 2 & 4)
- Locate the DIMM slots labeled DIMMA2 and DIMMB2 RAM slots.
- Push down the EZ Clip on one side of each slot.
- Hold the RAM so the notch matches the slot key.
- Insert RAM straight down with even pressure until both latches click.

## SSD Installation (Samsung 990 Pro M.2_2 Source)
1. Press and hold the end button of Screwless M.2 Shield Frozr heatsink.
2. Slightly lift up the end part of the Screwless M.2 Shield Frozr heatsink and move it forward to uninstall the heatsink.
3. Remove the protective film including the rubber cube from the M.2 thermal pads on the M.2 plate.
4. Insert your M.2 SSD into the M.2 slot at a 30-degree angle.
5. Use the EZ M.2 Clip II to automatically lock and secure the SSD.
6. Remove the protective films from the thermal pads under Screwless M.2 Shield Frozr heatsink.
7. Align the notches under Screwless M.2 Shield Frozr heatsink with the tenons, and then put the heatsink back in place.
8. Press the end side of the Screwless M.2 Shield Frozr heatsink to lock it completely.

## CPU Cooler Installation
1. Remove the top cover and take out the fan in between the towers
2. Flip the motherboard, attach the backplate on the rear of the motherboard. Align with the screw holes and keep it pressed while flipping the motherboard back.
3. For each of the four corners, place the double-sided screws (G) through the holes.
4. Place the retention brackets (C) horizontally, with the flatten side pointing towards the CPU.
5. Assemble the thumb screws (F) for each corner and tighten them.
6. Apply the thermal compound on top of the CPU, and rip off the protection plastic from the contact point
7. Position the cooler’s base plate over the CPU, with the fan above the RAM slots (maybe try the other way if there is space available.
8. Tighten the screws inside the fan in the middle, which should attach to the middle of each retention bracket.
9. Place the fan back in between the towers and place back the top cover.
10. Connect the CPU_FAN1 from Motherboard to the cooler through 2-to-1 converter (J), and connect the JARGB_V2_3 form Motherboard to the other connector from the cooler (directly without the converter)

## Case Preparation
- Remove the right side panel
- Remove the left side panel
- Remove the top panel
- Remove the side glass panel
- Remove the bottom side mesh panel
- Remove the dust filters.

## Install Motherboard into Case
1. Remove the shield covering M.2_1 SSD.
2. Align the motherboard’s screw holes (9 in total) with the case.
3. Carefully lower the motherboard into the case, align the I/O panel with the case from 45 degrees diagonally and gently lay down the motherboard by matching the screw holes.
4. Secure the motherboard with the screws (a) tighten on the screw holes. Don’t overtighten (0.3N*m)
5. Place back the shield covering M.2_1 SSD.

## Cable Wiring and Management
- Connect the ATX 24-pin cable to the ATX_PWR1.
- Connect both the EPS 12V CPU 8-pin (4+4) cable to the CPU_PWR1 and CPU_PWR2.
- Connect the PCIe 8-pin (6+2) cable to the PCIe_PWR1
- Connect the 12V-2x6 16-pin (12+4) cable to the Graphics Card power supply.
- Plug in the SATA Cable from Power Supply
- Double check CPU Cooler fan connection.
- Connect the Fan hub 4-pin (PWM) to SYS_FAN1 (Auto Mode), 3-pin (RGB) to JARGB_V2_2 (5V), and Power Supply to port from SATA Cable.
- Connect the Power SW to JFP1
- Connect the Audio Combo to JAUD1
- Connect the USB 3.0 to JUSB3
- Connect the USB 3.2 to JUSB5
- Utilize the cable zip tie, rubber grid for cable management.
- Assemble all of the panels back to the case.
- Install the Wifi-Antenna.

## Graphics Card Installation
1. Remove the screw of the expansion slot plates, remove the plates to make sure the port can be exposed.
2. Make sure the EZ PCIe Release Button is in locked (unpressed) position.
3. Align the Graphics card with the slot and firmly press it in until it clicks.
4. Install the screws back to the plates.
5. Plug in the Graphics Card Power Supply.

## Prepare BIOS & OS Flash Drives
- For the BIOS flash drive, download the newest BIOS version from the MSI official website. Save the file into the USB drive and name it MSI.ROM, make sure it is in the root directory.
- Create Windows 11 Installation Media to USB Drive and Windows website. It is recommended to use Windows PC for this step.
- Create RHEL 9.6 Linux ISO image to USB Drive from Red Hat Linux Official Website.

## Update the motherboard with the newest BIOS version
1. Plug the BIOS USB flash device with the MSI.ROM file into the Flash BIOS Port on the rear I/O panel.
2. Press the Flash BIOS Button to start flashing the BIOS. The LED will start flashing to indicate the process has begun.
3. Wait for the LED to turn off, indicating the process is complete.

## Booting & BIOS Setup
1. Connect the monitor, keyboard, and mouse to the I/O panel from the motherboard.
2. Power on the system and press DEL to enter the BIOS setup when the MSI logo appears.
3. Look at the right side of the BIOS screen in EZ Mode and make sure all of the hardwares (Motherboard, CPU, DRAM, Storage) are detected.
4. Check the EZ Debug LED on the motherboard to make sure everything is working properly.
5. Enable CPU Game Boost, NPU AI Boost, Memory XMP Profile, and Intel 200S Boost.
6. Save & Exit the BIOS Setting.

## Windows 11 OS Installation
1. Power on the computer.
2. Insert the Windows 11 installation disc/ USB into your computer.
3. Press the Restart button on the computer case.
4. Press F11 key during the computer POST (Power-On Self Test) to get into BootMenu.
5. Select the Windows 11 installation disc/USB from the Boot Menu.
6. Follow the instructions on the screen to install Windows 11.

## Extra: Manual CPU and RAM Overclocking
- Only do it after system run with stability

## Reference
- [MSI MPG Z890 Carbon Wifi Driver & BIOS Download](https://www.msi.com/Motherboard/MPG-Z890-CARBON-WIFI/support#utility)
- [Windows 11 Installation Media](https://www.microsoft.com/en-us/software-download/windows1)
- [RHEL Linux Download](https://developers.redhat.com/products/rhel/download#getredhatenterpriselinux7163)




