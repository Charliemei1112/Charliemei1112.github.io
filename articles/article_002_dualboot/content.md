## Background Story

As a Computer Science major, I have been using Linux system in multiple scenarios. When I took Operating Systems, I used Ubuntu Linux on virtual machine as a tool to understand and modify the kernel code. In fact, Linux system is preferred in a lot of my CS courses, especially with those that involve coding assignment, since Linux system is the best tool to provide a standardizeed environment to test the code. Given multiple open source Linux versions provided (Ubuntu, RedHat, and Debian) and its simplicity for coding environment, it is the most common choice for coding development. 

For years, I have been using Linux system either through virtual machine (VMWare), cloud service (Google Cloud), and remote access to lab computers from school. At this point, I am thinking about installing my Linux system locally so that I can run my personal project on my own. As I started my Computer Engineering major at Columbia, I realized that most of the professional industrial-level softwares are developed natively for usage Windows & Linux. For coding purposes, I would like to have all of technical projects run natively on Linux System.

## How about Virtual Machines & Cloud Services?

Yes! You can absolutely create an instance of a virtual machine to achieve dual-system on your computer. The followings are powerful softwares to create an instance of virtual machine

- **VirtualBox** - Free virtualization software
- **VMWare** - Professional virtualization platform  
- **Parallel Desktop** - MacOS virtualization solution

Besides, there are also professional cloud services (not free) such as:

- **Google Cloud Platform (GCP)**
- **Amazon Web Services (AWS)**

These can be utilized to instantiate very powerful machines remotely, given its friendly user interface and enormous computing power from their data center.

## So why do we choose to install dualboot system?

<!-- So why do I still consider configuring a dual boot machine? Here are the following reasons: -->

### Hardware Resource Access
Compared to local virtual machines, dual boot systems grant you **full access to hardware resources** at boot time. The machine will only be booted into one systen at one time and the entire hardware resources (CPU, RAM, GPU, etc.) will be provided, while virtual machines have to split hardware resources so the host system can operate at the same time.

### Cost Effectiveness
Compared to professional virtual machine services such as Google Cloud or Amazon AWS, installing a dual boot system is **free of charge** as long as you have a computer already. To achieve the same effect of a personal computer (8-core CPU, 32GB RAM, and 512GB Storage), it would cost approximately **$300 per month**. Unless you need specific services from them (security reasons, for example), it is not cost-effective to implement them for personal use.

### Taking advantage of Windows and Linux System

Windows is the best platform for gaming since most games on Steam are developed solely for Windows. Meanwhile, Linux provides the best environment for coding. With powerful softwares such as Intel Quartus and ModelSim, Windows & Linux will provide the best dual operating systems combination.

I would not recommend installing dualboot system from Macbook(MacOS), since MacOS has very complicated and advanced security configuration and it could be very fragile when you are trying to manipulate with it.

This article is not a comprehensive step-by-step guide as there are plenty of articles online offering detailed guidance. However, I am posting a few problems I have encountered which I have spent an enormous amount of time searching for solutions. In other words, **this article is a troubleshooting guide**.

### 1. Disk Partition Problem

Before installing the Linux system, you have to reserve storage space for Linux by shrinking the volume from your current disk. However, you could encounter the problem that there is no available space for the volume to be shrunk.

**Possible causes:**
- Your entire disk is BitLocker encrypted (Windows feature that encrypts the entire disk)
- Default configuration provided by the seller

**Solution:** You can turn off BitLocker encryption via Control Panel.

### 2. Secure Boot Issues

When you enter the UEFI menu to boot Linux from your hard drive, you may not be able to recognize the content in the USB drive even though you flashed your drive correctly. This could probably be due to the fact that your **Secure Boot is turned on**.

**What is Secure Boot?**
This functionality ensures that no third-party operating systems (Linux) will be executed at boot time.

**Solution:** 
- Turn off Secure Boot in UEFI/BIOS settings
- **Important:** Make sure that the third-party operating system poses no threats by obtaining Linux from official websites only

### 3. Reinstalling Windows 11 System

There is a chance that you still cannot shrink your disk volume after you turned off encryption. This is probably because of the default Windows system configuration provided by the seller. This situation happened to me when I try to shrink the volume.

**Solution:** Reinstall Windows system by wiping out the entire system. (Of course, you can backup your files before reinstalling the system)

### 4. Driver Installation Issues

This is the most annoying step that you might encounter during Windows setup. There is a chance that you would not be able to enter commands in shell script to skip connecting to WiFi.

**Alternative Solution:**
- Acquire WiFi through Ethernet cable from another device
- The other device could be your computer, WiFi adapter, or any devices on your local network
- Purchase an Ethernet-to-USB converter cable if your device doesn't have an Ethernet port

**Tip:** This page is prompted multiple times during setup and it takes a while for this approach to connect to WiFi, so I suggest keeping it plugged in throughout the entire process.

## Boot Drive Configuration

There are multiple software options available that help you configure your boot drive for OS installation:

### Recommended Software:
- **balenaEtcher** (macOS)
- **Rufus** (Windows)
- **Windows Installation Media** (for Windows installation)

### Important Notes:
- The key idea is to have your operating system documents fully imaged into the USB drive
- **Warning:** Anything you previously contained on the USB will be wiped out
- Recommended USB size: **16GB/32GB** (most modern OS image files take up ~10GB)
- For Rufus users: Check if your device boots from UEFI or BIOS and select the correct option

### For Windows (Re)Installation:
I recommend using **Windows Installation Media** as it will launch a wizard that automatically sets up everything for you as long as you have your USB drive plugged in.

## References

**Windows 11 Installation Media:**  
https://www.microsoft.com/en-us/software-download/windows11
**Ubuntu Linux Image File:**
https://ubuntu.com/download/desktop
**Red Hat Linux Image File:**
https://www.redhat.com/en/technologies/linux-platforms/enterprise-linux
****


